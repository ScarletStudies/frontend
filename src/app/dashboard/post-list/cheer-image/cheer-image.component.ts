import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';

declare const Holder: any;

@Component({
    selector: 'app-cheer-image',
    templateUrl: './cheer-image.component.html',
    styleUrls: ['./cheer-image.component.css']
})
export class CheerImageComponent implements OnInit, AfterViewInit {

    @ViewChild('image')
    public imageQuery: ElementRef;

    @Input()
    public set count(count: number) {
        this.dataSrc = `holder.js/64x64?theme=social&text=${count} 📣`;
    }

    public dataSrc = 'holder.js/64x64?theme=sky&text=...';

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const imgEl = this.imageQuery.nativeElement;
        Holder.run({
            images: imgEl,
        });
    }
}
