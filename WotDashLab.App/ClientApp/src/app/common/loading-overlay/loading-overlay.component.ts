import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: 'loading-overlay.component.html',
  styleUrls: ['loading-overlay.component.scss']
})
export class LoadingOverlayComponent {
  @Input() isLoading = false;
  @Input() transparentBackground = false;
  @Input() fullScreen = true;
}
