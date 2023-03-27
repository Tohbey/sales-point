import { Component, Input, Output ,ElementRef, OnInit, Renderer2, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input()
  public modalClass!: string;

  @Input()
  public closeOnEscape: boolean = true;

  @Input()
  public closeOnOutsideClick: boolean = false;

  @Input()
  public title!: string;

  @Input()
  public hideCloseButton = false;

  @Input()
  public cancelButtonLabel!: string;

  @Input()
  public submitButtonLabel!: string;

  @Input()
  useCancelAsSecondaryButton: boolean = false;

  @Input()
  secondaryButtonClass: string = '';

  @Output()
  public onOpen = new EventEmitter(false);

  @Output()
  public onClose = new EventEmitter(false);

  @Output()
  public onSubmit = new EventEmitter(false);

  @Output()
  public onSecondarySubmit = new EventEmitter(false);

  @ViewChild("modalRoot", { static: true, read: ElementRef })
  public modalRoot!: ElementRef;
  isOpened: boolean = false
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    let modalElement = this.modalRoot.nativeElement;
    console.log("Modal Element",modalElement)
    if(modalElement){
      this.renderer.setAttribute(modalElement,'aria-hidden', 'false')
      this.renderer.setAttribute(modalElement,'data-bs-backdrop', 'static')
      this.renderer.setAttribute(modalElement,'data-bs-keyboard', 'true')
      // modalElement.modal({backdrop: 'static', keyboard: true, show: false})
    }
  }

  open() {
    if(this.isOpened){
      return;
    }
    let modalElement = this.modalRoot.nativeElement;
    if(modalElement){
      this.renderer.addClass(modalElement, 'show');
      this.renderer.setAttribute(modalElement,'aria-hidden', 'true')
      this.renderer.setAttribute(modalElement, 'role', 'dialog');
      this.renderer.setStyle(modalElement, 'display', 'block')
      this.renderer.setAttribute(modalElement, 'aria-haspopup', 'true');
      this.isOpened = true
    }
  }

  close() {
    if (!this.isOpened)
      return;
    let modalElement: any = this.modalRoot.nativeElement;
    this.renderer.setAttribute(modalElement, 'data-dismiss','modal');
    this.renderer.setStyle(modalElement, 'display', 'none')
    this.renderer.setAttribute(modalElement,'aria-hidden', 'false')
    this.isOpened = false;
  }

  preventClosing(event: MouseEvent){
    event.stopPropagation();
  }

  submit() {
    this.onSubmit.emit(undefined);
  }
}


