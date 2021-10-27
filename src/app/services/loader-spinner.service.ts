import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { LoaderSpinnerComponent } from '../UI/loader-spinner/loader-spinner.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderSpinnerService {
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  showSpinner() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }
    if (!this.overlayRef.hasAttached()) {
      // Create ComponentPortal that can be attached to a PortalHost
      const spinnerOverlayPortal = new ComponentPortal(LoaderSpinnerComponent);
      const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    }
  }

  hide() {
    if (!!this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
