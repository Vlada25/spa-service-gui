import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisible$ = new BehaviorSubject<boolean>(false)
  isLogin$ = new BehaviorSubject<boolean>(false)
  isRegister$ = new BehaviorSubject<boolean>(false)

  constructor() { }

  open(item: string) {
    switch (item) {
      case 'login':
        this.isLogin$.next(true)
        break
      case 'register':
        this.isRegister$.next(true)
    }
    this.isVisible$.next(true)
  }

  close() {
    this.isVisible$.next(false)
    this.isLogin$.next(false)
    this.isRegister$.next(false)
  }
}
