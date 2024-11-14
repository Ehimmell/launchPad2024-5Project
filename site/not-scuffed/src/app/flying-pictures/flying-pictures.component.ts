import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-flying-pictures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flying-pictures.component.html',
  styleUrls: ['./flying-pictures.component.css'],
})
export class FlyingPicturesComponent implements OnInit, OnDestroy {
  images: string[] = ['/pencil.png', '/apple.png', '/calculator.png', '/book.png', '/globe.png'];
  currentImageIndex: number = -1;
  currentImage: string = '';
  intervalId: any;

  randomX: number = 0;
  randomY: number = 0;

  transformStyle: string = '';
  initialTransform: string = '';
  finalTransform: string = '';
  opacity: number = 0;

  viewportWidth: number = 0;
  viewportHeight: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.images && this.images.length > 0) {
        this.updateViewportDimensions();

        window.addEventListener('resize', this.updateViewportDimensions);

        console.log('Animation started');
        this.startAnimation();
      } else {
        console.error('No images provided to FlyingPicturesComponent');
      }
    }
  }

  updateViewportDimensions = () => {
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
  }

  startAnimation() {
    this.showNextImage();
    this.intervalId = setInterval(() => {
      this.showNextImage();
    }, 1500);
  }

  showNextImage() {
  this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;

  const maxDistanceX = this.viewportWidth / 2;
  const maxDistanceY = this.viewportHeight / 2;

  this.randomX = Math.floor(Math.random() * (2 * maxDistanceX + 1)) - maxDistanceX;
  this.randomY = Math.floor(Math.random() * (2 * maxDistanceY + 1)) - maxDistanceY;

  // Include rotation in the transforms
  this.initialTransform = 'translate(-50%, -50%) scale(0.1) rotate(0deg)';
  this.finalTransform = `translate(calc(-50% + ${this.randomX}px), calc(-50% + ${this.randomY}px)) scale(1) rotate(360deg)`;

  this.transformStyle = this.initialTransform;
  this.opacity = 0;

  this.currentImage = '';
  setTimeout(() => {
    this.currentImage = this.images[this.currentImageIndex];

    setTimeout(() => {
      this.transformStyle = this.finalTransform;
      this.opacity = 1;
    }, 50);
  }, 50);
}


  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      window.removeEventListener('resize', this.updateViewportDimensions);
    }
  }
}
