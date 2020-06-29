// Continue here...

/*
 *
 * right from the bottom line, having an input that helps you locate an address quickly is nice,
 * but it is just the first building block for providing full product solutions to the users.
 *
 * Assume we have a WSR auto-complete input powered by google-places that returns minimal geoData of the selected address
 * "suggestion", let call it <GooglePlacesAutoCompleteInput/>
 *
 * What types of products can we build with it?
 * Note: Each component should provide only one additional capability (feature) to the final product!
 */

/**
 * Example 1 - GoogleAddressInput
 *  Auto-complete input lookup for full address details

 *  This one is pretty simple, the information you get from the address "suggestion" object is very limited and you probably
 *  need more info to work with, a very common way to do it is to call google-geoCode service with the keys/latLong you got
 *  from the "suggestion".
 */
// const GoogleAddressInput = ({ onSelect, ...restProps }) => {
//   const handleSelect = async suggestion =>
//     onSelect(await getGeoCode(suggestion));
//   return (
//     <GooglePlacesAutoCompleteInput onSelect={handleSelect} {...restProps} />
//   );
// };
/**
 * In this example we see that <GoogleAddressInput/> "adopts" the propTypes api of <GooglePlacesAutoCompleteInput/>
 * and just taking over the `onSelect` handling in order to perform the lookup request for the geoCoded data.
 * This means that we gained all the customizations capabilities and safety of GooglePlacesAutoCompleteInput while we can
 * keep our focus on the added value this component provide.
 */

import Text from '../Text';
import React from 'react';

/**
 * Example 2 - GoogleAddressInputWithDistance
 * Same as Example 1 with the addition of showing the distance of my device from each "suggestion".
 *
 * Here we need to interfere with something internal of GooglePlacesAutoCompleteInput, how it should render the options.
 * To the rescue comes <GooglePlacesAutoCompleteInput.Option/> compounded component that helps us to manipulate the option
 * layout within the boundaries defined by UX, this component is used internally by default unless specified differently.
 */
const GoogleAddressInputWithDistance = props => (
  <GoogleAddressInput // Reusing the component we showcased in Example 1
    {...props}
    withDistance // a flag that notifies the geoLocationService to provide this data when performing requests for suggestions.
    renderOption={({ option }) => (
      <GooglePlacesAutoCompleteInput.Option
        option={option}
        suffix={<Text>{formattedDistance(option.distance)}</Text>}
      />
    )}
  />
);
/**
 * Here we allow the user to determine how to convert parts of the "suggestion" data into props, since we don't want him
 * to do it for all props the "suggestion" using a context consumer to fill in the missing props on his behalf.
 * This frees the developer from dealing with anything that is not related to his use case.
 * */

/**
 * Example 3 - GooglePlacesAutoCompleteInputWithRecentSearches
 * Showing the user the last X searches before he starts to type.
 *
 * To keep the business logic of managing the last searches separated we will use here a render-props provider
 * to do the heavy lifting for us, let's call it <RecentSearchesProvider/>
 */
const GooglePlacesAutoCompleteInputWithRecentSearches = ({
  numOfRecentSearches,
  onSelect,
  ...restProps
}) => (
  <RecentSearchesProvider numOfRecentSearches={numOfRecentSearches}>
    {({ recentSearches, addSearch }) => {
      const handleSelect = async suggestion => {
        await addSearch(suggestion);
        onSelect(suggestion);
      };
      return (
        <GooglePlacesAutoCompleteInput
          {...restProps}
          onSelect={handleSelect}
          options={recentSearches.map(search => (
            <GooglePlacesAutoCompleteInput.Option
              {...search}
              prefix={
                <Input.IconAffix>
                  <ClockIcon />
                </Input.IconAffix>
              }
            />
          ))}
        />
      );
    }}
  </RecentSearchesProvider>
);

/**
 * You can notice that since we need to preserve the "suggestion" object here and not the full-location object like provided
 * in Example 1 <GoogleAddressInput/> or 2 <GoogleAddressInputWithDistance/> we had to use <GooglePlacesAutoCompleteInput/>
 * directly. This is not ideal since now if we want to have recent-searches for those components we will need to refactor
 * them to use GooglePlacesAutoCompleteInputWithRecentSearches instead.
 *
 * So the new GoogleAddressInput would look like...
 * */
const GoogleAddressInputWithRecentSearches = ({ onSelect, restProps }) => {
  const handleSelect = async suggestion =>
    onSelect(await getGeoCode(suggestion));
  return (
    <GooglePlacesAutoCompleteInputWithRecentSearches
      onSelect={handleSelect}
      {...restProps}
    />
  );
};

/**
 * Check point so far.
 * We established a clear separation for different capabilities we want to enhance in the end-result
 * component. however, we notice that due to the "tree like" nature of component composition, every time we would like to
 * add another capability we will need to identify the "right" place it fits on the tree and refactor up any usages of the
 * wrapped component.
 * On top of that, we still need an elegant way to turn on/off capabilities while avoiding adding a ternary switch before
 * every render step.
 * */

/**
 * GooglePlacesAutoCompleteInput
 * a component that should provide the user an auto-complete input for address suggestions and
 * return the `suggestion` object of the user selected suggestion
 * */
const GooglePlacesAutoCompleteInput = ({
  size,
  roundInput,
  optionsLayout,
  showOptionsIcon,
  initialValue,
  onChangeDebounceWait,
  onSelect,
  onChange,
  onClear,
}) => (
  /**
   * GooglePlacesAutoCompleteProvider
   * a component that should manage the interactions with the google api according to a changing input value.
   * This component is just the `render-props` version of the `usePlacesAutocomplete` 3rd-party hook and it is here to
   * play the role of a LocationService provider that has an api we want to integrate with.
   * This part can be replaced with a `AtlasAutoCompleteProvider` for example while supporting a completely different api.
   * (https://github.com/wellyshen/use-places-autocomplete)
   * */
  <GooglePlacesAutoCompleteProvider
    requestOptions={{ input: initialValue }}
    debounce={onChangeDebounceWait}
  >
    {({
      value,
      setValue,
      suggestions = { data, status },
      clearSuggestions,
    }) => (
      /**
       * GooglePlacesAutoCompleteAdapter
       * a component that should act as a bridge between the LocationProvider and the UI-Layer components.
       * it should be familiar with the api of both ends and make sure that it is fulfilled correctly by receiving all the
       * the relevant data and returning an api that is as close as possible to the UI-Layer.
       * Every adapter is a custom implementation for each LocationProvider/UI-Layer tuple and not a generic tool that
       * can be used for all, later on we might structure it better internally to facilitate common methods and
       * lifecycle hooks so it will be easier to write more adapters.
       *
       * In this use case for example, `GooglePlacesAutoCompleteProvider` is performing an api call
       * for every `setValue` invocation, this means that i can't just pass the provider's `setValue` method directly to the
       * `AddressInput` `onChange` prop since it leads to `AddressInput` knowing stuff about this provider behaviour
       * which isn't what we want. This is why we need the adapter to act as a middleman that knows how to prevent it
       * (calling `setValue(description, false)`
       * in this case). this leads to the fact that this specific adapter must control the input value as well which might
       * not be necessary for other adapters in the future.
       *
       * Another example, since `GooglePlacesAutoCompleteProvider` is performing it's api call already debounced i want to
       * prevent the `AddressInput` from doing another `debounce` action, this is why this adapter is returning an
       * onChangeDebounceWait with the value of 0 to since it is familiar with the `AddressInput` api.
       * */
      <GooglePlacesAutoCompleteAdapter
        // Provider Props
        value={value}
        setValue={setValue}
        suggestions={data}
        status={status}
        clearSuggestions={clearSuggestions}
        // AddressInput Props
        onSelect={onSelect}
        onChange={onChange}
        onClear={onClear}
      >
        {({
          value,
          onChange,
          onClear,
          options,
          onSelect,
          status,
          onChangeDebounceWait,
        }) => (
          <AddressInput
            // AddressInput pass-through Props
            size={size}
            roundInput={roundInput}
            optionsLayout={optionsLayout}
            showOptionsIcon={showOptionsIcon}
            // GooglePlacesAutoCompleteAdapter Props
            initialValue={value}
            onChange={onChange}
            onClear={onClear}
            options={options}
            onSelect={onSelect}
            status={status}
            onChangeDebounceWait={onChangeDebounceWait}
          />
        )}
      </GooglePlacesAutoCompleteAdapter>
    )}
  </GooglePlacesAutoCompleteProvider>
);

/**
 * Let't try to add a few product features and see if the api is good enough
 * 1. Show last 5 searches.
 *    * Listen to `onSelect` changes and getting from the event the minimum set of data required for displaying it later
 *    as a "recent option"
 *    * Pass down an "options" array that will contain a `<ListItemSection/>` and the recent-options objects.
 * 2. Show a "My current location" option.
 *    * Pass down an "options" array with the action-option using the `<ListItemAction/>` component.
 *    * Listen to `onSelect` changes and identify the selection of our action-option.
 *    * Extract from the browserAPI the current LatLong info and pass it as the selected option to the Location Provider.
 *    (Needs further investigation)
 * 3. Shows a "distance" value in each option according to my current location:
 *    * Needs to notify the LocationProvider that we expect results to contain the `distance` value
 *    * Need to be able to modify the "suggested" options and to add the `distance` value as `suffix` (We should consider
 *    adding this to the AddressInput.Option implementation)
 * */
