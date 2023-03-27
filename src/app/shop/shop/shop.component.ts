import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Assest, Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent1 implements OnInit {
  shops: Shop[] = [];
  shop!: Shop;
  shopForm!: FormGroup;
  submit: boolean = false;
  isCreate: boolean = true;
  itemPerPage = 10;
  errorMsg: string= '';
  isError: boolean = false;
  paginationConfig:any = {};
  isLogo: boolean = false;
  logo!: Assest;
  @ViewChild("logoFileUploader", /* TODO: add static flag */ { read: ElementRef })
  logoUploader!: ElementRef;
  document:Assest[] = [];
  isDocument: boolean = false;
  @ViewChild("documentFileUploader", /* TODO: add static flag */ { read: ElementRef })
  documentUploader!: ElementRef;
  allowedMimeType: any[] = ['image/png', 'image/jpeg'];
  base64File: any;
  fileObject:any;
  fileName!: string;
  fileSize: any;

  constructor(private shopService: ShopService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getShopsByUser();
    this.createShopForm();
    this.paginationConfig = {
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItem: this.shops ? this.shops.length : 0
    }
  }
  pageChanged(event: any){
    this.paginationConfig.currentPage = event;
  }
  createShopForm() {
    this.shopForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      postCode: ['', Validators.required]
    })
  }

  selectLogo(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.setDocument(file, "logo");
    }
  }

  selectDocument(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.setDocument(file, "document")
    }
  }

  setDocument(file: any, type: string): void {
    if (this.allowedMimeType.indexOf(file.type) != -1) {
      let size = (file.size / 1024) / 1024
      if (size > 5) {
        this.errorMsg = 'Maximum size is 5MB';
        this.resetFileInput(type)
        return;
      }
      this.fileName = file.name.length > 10 ? file.name.substring(0, 10) + '...' : file.name
      this.fileSize = ((file.size / 1024) / 1024).toFixed(2) + 'MB'
      const toBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      };

      toBase64(file)
        .then(data => {
          this.base64File = data
          this.fileObject = {
            id: 1, fileType: this.getFileType(file.type),
            URL: this.base64File,
            name: this.fileName,
            fieldName: file.name,
            size: this.fileSize,
            type: this.getFileType(file.type)
          }

          if(type == "logo"){
            this.isLogo = true;
            this.logo = this.fileObject;
          }else{
            this.isDocument = true;
            this.document.push(this.fileObject);
          }
        })

    } else {
      this.resetFileInput(type);
      this.errorMsg = 'File format not supported ';
    }
  }

  resetFileInput(type:string) {
    if(type == "logo"){
      this.logoUploader.nativeElement.reset()
    }else{
      this.documentUploader.nativeElement.reset()
    }
  }

  getFileType(type:string):any{
    if (type.includes('png')) {
     return 'png'
   } else if (type.includes('jpg') || type.includes('jpeg')) {
     return 'jpg'
   }
 }

  get f() {
    return this.shopForm.controls
  }

  getShopsByUser() {
    this.shopService.getShopsByUser().subscribe((data) => {
      this.shops = data.data;
      console.log(this.shops);
    }, error => {
      console.log(error);
    })
  }

  deleteShop(id: any) {
    this.shopService.deleteShop(id).subscribe((data) => {
      console.log(data.msg)
      this.getShopsByUser()
    }, error => {
      console.log(error);
    })
  }

  getShop(id: any) {
    this.isCreate = false;
    const element = document.getElementById('edit');
    if (element) {
      element.style.display = 'block'
    }
    this.shopService.getShopById(id).subscribe((data) => {
      this.shop = data.data
      this.shopForm.patchValue(this.shop)
      console.log(this.shop)
    }, error => {
      console.log(error)
    })
  }

  addShop() {
    this.isCreate = true;
    this.shopForm.reset();
    const element = document.getElementById('edit');
    if (element) {
      element.style.display = 'block'
    }
  }

  onSubmit() {
    this.submit = true;
    if (this.shopForm.invalid || !this.isLogo || !this.isDocument) {
      this.isError = true;
      this.errorMsg = '*Make sure you submit valid documents and fill the form appropriately.';
      return;
    }

    this.shop = this.shopForm.value;
    this.shop.certificates = this.document;
    this.shop.logo = this.logo;
    console.log(this.shop);

    this.shopService.createShop(this.shopForm.value).subscribe((data) => {
      console.log(data.data._id);
      this.shopForm.reset();
      Object.keys(this.shopForm.controls).forEach(key => {
        this.shopForm.get(key)?.setErrors(null);
      });
      this.getShopsByUser();
      const element = document.getElementById('edit');
      if (element) {
        element.style.display = 'none';
      }
    }, error => {
      console.log(error)
    })
  }

  onEdit() {
    this.submit = true;
    if (this.shopForm.invalid) {
      return;
    }
    this.shopService.updateShop(this.shop._id, this.shopForm.value).subscribe((data) => {
      console.log(data.msg)
      this.shopForm.reset();
      Object.keys(this.shopForm.controls).forEach(key => {
        this.shopForm.get(key)?.setErrors(null);
      });
      this.getShopsByUser();
      const element = document.getElementById('edit');
      if (element) {
        element.style.display = 'none';
      }
    }, error => {
      console.log(error)
    })
  }
}
