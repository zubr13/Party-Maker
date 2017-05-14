import { Directive, Input, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter, AfterViewInit } from '@angular/core';

export class Config {
    public quality: number = 0.92;
    public jpeg: boolean = false;
    public saveRatio: boolean = false;
    constructor() {}
}
/**
 * <canvas width="800" height="400" appCanvasImage
        [config]="{quality: 1, saveRatio: false, jpeg : true}"
        [img]="file"
        (onImageMinificationDone)="minifiedImage($event)"
    ></canvas>
 */

@Directive({
    selector: '[appCanvasImage]'
})
export class CanvasImageDirective implements OnChanges, AfterViewInit {
    @Input() img: File;
    @Input() animation: Function;
    @Input() config: Config = new Config();
    @Output() onImageMinificationDone = new EventEmitter<Object>();
    private internalImage: HTMLImageElement = new Image();

    constructor(private canvas: ElementRef) {}

    ngAfterViewInit() {
        this.internalImage.addEventListener('load', () => this.onImageLoad());
        if (typeof this.animation === 'function') {
            this.internalImage.addEventListener('load', () => this.animation(this.canvas.nativeElement));
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const img = changes['img']['currentValue'];
        console.log('changes', changes);
        if (img && this.img instanceof File) {
            this.internalImage['src'] = URL.createObjectURL(img);
        }
    }

    onImageLoad(): void  {
        const nEl = this.canvas.nativeElement;
        const ctx = nEl.getContext('2d');
        if (this.config.saveRatio) {
            nEl.height = this.internalImage.height * nEl.width / this.internalImage.width;
        }

        ctx.rect(0, 0, nEl.width, nEl.height);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.clearRect(0, 0, this.canvas['width'], this.canvas['height']);
        ctx.drawImage(this.internalImage, 0, 0, nEl.width, nEl.height);
        let dataURI = this.config.jpeg ? nEl.toDataURL("image/jpeg", this.config.quality) : nEl.toDataURL(),
            byteString,
            mimeString,
            ia;
        byteString = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            decodeURIComponent(dataURI.split(',')[1]);

        mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        this.onImageMinificationDone.emit({base64 : dataURI, blob: new Blob([ia], {type:mimeString}), width: nEl.width});
    }
}