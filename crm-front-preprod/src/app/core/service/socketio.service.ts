import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: any;

  constructor(public apiService: ApiService) { }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('my message', JSON.parse(localStorage.getItem('account')).userName + 'is connected');
    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
/*
    this.socket = io(environment.SOCKET_ENDPOINT, {
      query: {
        token: 'cde'
      }
    });
*/
  }



}
