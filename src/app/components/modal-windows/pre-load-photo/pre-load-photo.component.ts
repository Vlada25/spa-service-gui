import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';
import { PhotoService } from 'src/app/services/photo.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-pre-load-photo',
  templateUrl: './pre-load-photo.component.html',
  styleUrls: ['./pre-load-photo.component.css']
})
export class PreLoadPhotoComponent implements OnInit {

  form = new FormGroup({
    master: new FormControl<string>('', [
      Validators.required
    ]),
    time: new FormControl<string>('', [
      Validators.required
    ])
  })

  @ViewChild('input') inputRef: ElementRef
  image: File
  imagePreview: any
  
  constructor(
    public authService: AuthenticationService,
    public photosService: PhotoService,
    public modalService: ModalService
    ) { }

  ngOnInit(): void {
  }

  submit(){
    this.photosService.createUserPhoto(this.authService.currentUser.id, this.image)
      .subscribe(() => {
        this.modalService.close()
        location.reload()
      })
  }

  triggerClick(){
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any){
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }
}
