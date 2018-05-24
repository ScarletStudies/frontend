import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, SimpleChanges, OnChanges } from '@angular/core';

declare const Holder: any;

@Component({
    selector: 'app-cheer-image',
    templateUrl: './cheer-image.component.html',
    styleUrls: ['./cheer-image.component.css']
})
export class CheerImageComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('image')
    public imageQuery: ElementRef;

    @Input()
    public set count(count: number) {
        this.dataSrc = `holder.js/64x64?theme=social&text=${count} 📣`;
    }

    private dataSrc = 'holder.js/64x64?theme=sky&text=...';

    constructor() { }

    private resetImage() {
        const imgEl: HTMLImageElement = this.imageQuery.nativeElement;
        imgEl.src = '';
        imgEl.dataset.src = this.dataSrc;

        Holder.run({
            images: imgEl,
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.resetImage();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.resetImage();
    }
}

