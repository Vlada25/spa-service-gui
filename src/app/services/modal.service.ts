import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalTypes } from '../enums/modal-types';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisible$ = new BehaviorSubject<boolean>(false)
  isLogin$ = new BehaviorSubject<boolean>(false)
  isRegister$ = new BehaviorSubject<boolean>(false)
  isServiceType$ = new BehaviorSubject<boolean>(false)
  isPhoto$ = new BehaviorSubject<boolean>(false)
  isOrder$ = new BehaviorSubject<boolean>(false)
  isFeedback$ = new BehaviorSubject<boolean>(false)

  constructor() { }

  open(item: ModalTypes) {
    switch (item) {
      case ModalTypes.login:
        this.isLogin$.next(true)
        break
      case ModalTypes.register:
        this.isRegister$.next(true)
        break
      case ModalTypes.serviceType:
        this.isServiceType$.next(true)
        break
      case ModalTypes.photo:
        this.isPhoto$.next(true)
        break
      case ModalTypes.order:
        this.isOrder$.next(true)
        break
      case ModalTypes.feedback:
        this.isFeedback$.next(true)
        break
    }
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
    this.isLogin$.next(false)
    this.isRegister$.next(false)
    this.isServiceType$.next(false)
    this.isPhoto$.next(false)
    this.isOrder$.next(false)
    this.isFeedback$.next(false)
  }
}
