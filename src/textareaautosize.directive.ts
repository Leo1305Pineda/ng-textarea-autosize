import { Input, AfterViewInit, ElementRef, HostListener, Directive, Output, EventEmitter } from '@angular/core';

export class ResizedEvent {
  element: HTMLElement;
  width: number;
  height: number;
  constructor(o: any = {}) {
    this.element = o.element;
    this.width = o.width;
    this.height = o.height;
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'textarea[autosize]'
})
// tslint:disable-next-line:directive-class-suffix
export class TextAreaAutoSize implements AfterViewInit {

  private el: HTMLElement;
  private _height: string;
  private _minHeight: string;
  private _maxHeight: string;
  private _clientWidth: number;
  private resizeEvent: ResizedEvent;

  @Input('height')
  get height() {
    return this._height;
  }
  set height(val: string) {
    this._height = val;
    this.updateHeight();
  }

  @Input('minHeight')
  get minHeight() {
    return this._minHeight;
  }
  set minHeight(val: string) {
    this._minHeight = val;
    this.updateMinHeight();
  }

  @Input('maxHeight')
  get maxHeight() {
    return this._maxHeight;
  }
  set maxHeight(val: string) {
    this._maxHeight = val;
    this.updateMaxHeight();
  }

  @Output() resized = new EventEmitter<ResizedEvent>();

  @HostListener('window:resize', ['$event.target'])
  onResize(textArea: HTMLTextAreaElement) {
    // Only apply adjustment if element width had changed.
    if (this.el.clientWidth === this._clientWidth) {
      return;
    }
    this._clientWidth = this.element.nativeElement.clientWidth;
    this.adjust();
  }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {
    this.el = element.nativeElement;
    this._clientWidth = this.el.clientWidth;
  }

  ngAfterViewInit(): void {
    // set element resize allowed manually by user
    const style = window.getComputedStyle(this.el, null);
    if (style.resize === 'both') {
      this.el.style.resize = 'horizontal';
    } else if (style.resize === 'vertical') {
      this.el.style.resize = 'none';
    }
    // run first adjust
    this.adjust();
  }

  adjust(): void {
    // perform height adjustments after input changes, if height is different
    const textArea: HTMLElement = this.element.nativeElement;
    let height = this.element.nativeElement.scrollHeight;
    const width = this.el.clientWidth;
    const element: any = this.el;
    textArea.style.height = 'auto';
    if (this.element.nativeElement.scrollHeight < this._maxHeight) {
      height = this.el.scrollHeight === 0 ? this._height : textArea.scrollHeight;
      textArea.style.height = `${height}px`;
      textArea.style.overflowY = 'hidden';
    } else {
      height = this._maxHeight;
      textArea.style.height = `${height}px`;
      textArea.style.overflowY = 'auto';
    }
    const enc = this.resizeEvent ? height !== this.resizeEvent.height : false;
    this.resizeEvent = new ResizedEvent({ element, width, height });
    if (enc) {
      this.resized.emit(this.resizeEvent);
    }
  }

  updateHeight(): void {
    // Set textarea min height if input defined
    this.el.style.height = this._height + 'px';
  }

  updateMinHeight(): void {
    // Set textarea min height if input defined
    this.el.style.minHeight = this._minHeight + 'px';
  }

  updateMaxHeight(): void {
    // Set textarea max height if input defined
    this.el.style.maxHeight = this._maxHeight + 'px';
  }

}
