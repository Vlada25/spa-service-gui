import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { IPhoto } from 'src/app/models/photo';
import { IUrl } from 'src/app/models/url';
import { ModalService } from 'src/app/services/modal.service';
import { PhotoService } from 'src/app/services/photo.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';

@Component({
  selector: 'app-create-service-type',
  templateUrl: './create-service-type.component.html',
  styleUrls: ['./create-service-type.component.css']
})
export class CreateServiceTypeComponent implements OnInit {

  showPhoto = false

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ]),
    lastingInMinutes: new FormControl<string>('', [
      Validators.required
    ]),
    description: new FormControl<string>('', [
      Validators.required
    ]),
    category: new FormControl<string>('', [
      Validators.required
    ]),
    photoUrl: new FormControl<string>('', [
      Validators.required
    ]),
  })

  constructor(
    private serviceTypeService: ServiceTypeService,
    public photoService: PhotoService,
    private modalService: ModalService) { }

  get name() {
    return this.form.controls.name as FormControl
  }

  get lastingInMinutes() {
    return this.form.controls.lastingInMinutes as FormControl
  }

  get description() {
    return this.form.controls.description as FormControl
  }

  get category() {
    return this.form.controls.category as FormControl
  }

  get photoUrl() {
    return this.form.controls.photoUrl as FormControl
  }

  ngOnInit(): void {
  }

  findPhoto(): void {
    var url: IUrl = {
      value: this.form.value.photoUrl as string
    }

    this.photoService.getByUrl(url).subscribe(() => {})

    this.showPhoto = true
  }

  submit(photoId: string | undefined) {
    this.serviceTypeService.create({
      name: this.form.value.name as string,
      lastingInMinutes: Number(this.form.value.lastingInMinutes as string),
      description: this.form.value.description as string,
      category: this.form.value.category as string,
      photoId: String(photoId)
    }).subscribe( () => {
      this.modalService.close()
    })
  }

}
