import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app-store.module';
import { LoginUser, RegisterUser } from '@store/actions/auth.action';
import { validateWhitespace } from '@app/utilities/validators';
import { AuthDTO } from '@app/models/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.authForm = this.fb.group({
      username: this.fb.control('', [Validators.required, validateWhitespace]),
      password: this.fb.control('', [Validators.required, validateWhitespace])
    });
  }

  login() {
    const val = this.authForm.getRawValue() as AuthDTO;
    this.store.dispatch(new LoginUser(val));
  }

  register() {
    const val = this.authForm.getRawValue() as AuthDTO;
    this.store.dispatch(new RegisterUser(val));
  }
}
