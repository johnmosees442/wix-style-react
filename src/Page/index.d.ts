import * as React from 'react';
import PageHeader from '../PageHeader';
import { ScrollChangedData } from '../common/ScrollableContainer';

export type PageProps = {
  dataHook?: string;
  backgroundImageUrl?: string;
  maxWidth?: number;
  minWidth?: number;
  height?: string;
  sidePadding?: number;
  className?: string;
  gradientClassName?: string;
  scrollableContentRef?: (ref: HTMLElement) => void;
  zIndex?: number;
  horizontalScroll?: boolean;
  scrollThrottleWait?: number;
  onScrollPositionChanged?: (scrollChangedData: ScrollChangedData) => void;
  onScrollChanged?: (target: HTMLElement) => void;
};

export interface ContentProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}
declare const Content: React.SFC<ContentProps>;

export interface FixedContentProps {
  children: React.ReactElement;
}
declare const FixedContent: React.FunctionComponent<FixedContentProps>;

export interface TailProps {
  children: React.ReactElement;
  minimized?: boolean;
}
declare const Tail: React.FunctionComponent<TailProps>;

export interface StickyProps {
  children: React.ReactElement | StickyChildrenRenderFn;
  style?: React.CSSProperties;
}
type StickyChildrenRenderFn = (data: {
  style: string;
  className: string;
}) => React.ReactElement;
declare const Sticky: React.SFC<StickyProps>;

export default class Page extends React.PureComponent<PageProps> {
  static Header: typeof PageHeader;
  static Content: typeof Content;
  static FixedContent: typeof FixedContent;
  static Tail: typeof Tail;
  static Sticky: typeof Sticky;
}
