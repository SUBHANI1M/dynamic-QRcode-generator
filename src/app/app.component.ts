import { Component, ElementRef, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  imports: [QRCodeComponent, FormsModule, CommonModule],
  template: `
    <div>
      <h2>Dynamic QR Designer</h2>
    
      <!-- SVG Template Area -->
      <svg #svgEl width="500" height="700" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
  <rect width="100%" height="100%" fill="#8B0000" />
  <path d="M0,700 C384,900 384,900 768,700 L768,1081 L0,1081 Z" fill="#FFCC4D" />

  <!-- Decorative Icon -->
  <text x="50%" y="60" fill="white" text-anchor="middle" font-size="24" font-family="serif">✦∘∘✦</text>

  <!-- Header Text -->
  <text x="50%" y="150" fill="white" text-anchor="middle" font-size="60" font-family="Georgia" font-weight="bold">SCAN</text>
  <text x="50%" y="210" fill="white" text-anchor="middle" font-size="35" font-family="Georgia">Here</text>
  
  <!-- Dynamic Text -->
  <text  x="50%" y="260" fill="white" text-anchor="middle" font-size="20" font-family="Arial" letter-spacing="4"> {{ customText }}</text>
       

        <!-- QR Code SVG injected -->
        <foreignObject x="150" y="320" width="200" height="200">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <qrcode [qrdata]="qrData" [width]="200" elementType="svg"></qrcode>
          </div>
          
        </foreignObject>
        <text x="50%" y="610" fill="white" text-anchor="middle" font-size="35" font-family="cursive">{{ customTextForBrand }}</text>

        </svg>
        
      <br />
      
      <div>
  <label for="qrData">Dynamic QR Code:</label>
  <input id="qrData" [(ngModel)]="qrData" placeholder="Enter QR Data" />
</div>

<div>
  <label for="customText">Dynamic Message:</label>
  <input id="customText" [(ngModel)]="customText" placeholder="Custom Message" />
</div>

<div>
  <label for="customTextForBrand">Custom Brand Name:</label>
  <input id="customTextForBrand" [(ngModel)]="customTextForBrand" placeholder="Enter custom Brand Name" />
</div>

      <br />
<button class="download-btn" (click)="downloadSVG()">Download as SVG</button>

        </div>
  `
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  qrData: string = 'https://example.com';
  customText: string = 'Message!';
  customTextForBrand: string = 'Brand Name';

  @ViewChild('svgEl') svgRef!: ElementRef<SVGSVGElement>;

  downloadSVG() {
    const svg = this.svgRef.nativeElement;
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'designed-qr.svg';
    link.click();

    URL.revokeObjectURL(url);
  }
}
