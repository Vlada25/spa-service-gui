import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisible$ = new BehaviorSubject<boolean>(false)
  isLogin$ = new BehaviorSubject<boolean>(false)
  isRegister$ = new BehaviorSubject<boolean>(false)
  isServiceType$ = new BehaviorSubject<boolean>(false)
  isPhoto$ = new BehaviorSubject<boolean>(false)

  constructor() { }

  open(item: string) {
    switch (item) {
      case 'login':
        this.isLogin$.next(true)
        break
      case 'register':
        this.isRegister$.next(true)
        break
      case 'serviceType':
        this.isServiceType$.next(true)
        break
      case 'photo':
        this.isPhoto$.next(true)
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
  }
}
