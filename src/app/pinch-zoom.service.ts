import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PinchZoomService {

  constructor() {}

  eventCache: PointerEvent[] = [];
  prevDiff = -1;
  target = document.createElement('img')


  initPinchZoom(targetElement: HTMLImageElement) {
    this.target = targetElement
    this.target.onpointerdown = this.pointerDownHandler;
    this.target.onpointermove = this.pointerMoveHandler;

    // The desired behaviour on all these four events (cancel zoom)
    // is the same so we can use the same handler for all four.
    this.target.onpointerup = this.pointerUpHandler;
    this.target.onpointercancel = this.pointerUpHandler;
    this.target.onpointerout = this.pointerUpHandler;
    this.target.onpointerleave = this.pointerUpHandler;
  }

  pointerDownHandler(event: PointerEvent) {
    this.eventCache.push(event);
    console.log("pointerDown", event)
  }

  pointerMoveHandler(event: PointerEvent) {
    console.log("pointerMove", event)

    // Find this event in the cache and update its record
    const index = this.eventCache.findIndex(
      (cachedEvent) => cachedEvent.pointerId === event.pointerId
    )
    this.eventCache[index] = event;

    // If two pointers, check for pinch zoom gesture
    if (this.eventCache.length === 2) {
      const currentDiff = Math.abs(this.eventCache[0].clientX - this.eventCache[1].clientX);
      if (this.prevDiff > 0) {
        let scale = currentDiff / this.prevDiff
        if (currentDiff > this.prevDiff) {
          // The distance between the pointers has increased - zoom in
          this.target.style.transform = `scale(${scale})`
          console.log('zooming in')
        }
        if (currentDiff < this.prevDiff) {
          // The distance between the pointers has decreased - zoom out
          this.target.style.transform = `scale(${scale})`
          console.log("zooming out")
        }
      }
      // Save the distance for the next move event
      this.prevDiff = currentDiff;
    }
  }

  pointerUpHandler(event: PointerEvent) {
    // Remove the current event from the cache
    this.target.style.transform = 'scale(1.0)'
    this.removeEvent(event)

    // If the number of pointers is less than 2 then reset distance tracker
    if (this.eventCache.length < 2) {
      this.prevDiff = -1;
    }
  }

  removeEvent(event: PointerEvent) {
    // Remove this event from the target element cache
    const index = this.eventCache.findIndex(
      (cachedEvent) => cachedEvent.pointerId === event.pointerId
    );
    this.eventCache.splice(index, 1);
  }

}
