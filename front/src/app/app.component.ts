import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ChatService } from "./services/chat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  users: number = 0;
  messages: any[] = [];
  input = "";

  @ViewChild("chat") private chat: ElementRef;
  constructor(private charService: ChatService) {}

  ngOnInit() {
    this.getUsers();
    this.getMessages();
    this.scrollToBottom();

  }
  getUsers() {
    this.charService.getUsers().subscribe((users: number) => {
      this.users = users;
    });
  }

  getMessages() {
    this.charService.receiveChat().subscribe((message: string) => {
      this.messages.push({
        date: new Date(),
        message: message,
      });
    });
  }
  sendMessage() {
    if (this.input !== "") {
      this.messages.push({
        date: new Date(),
        message: this.input,
      });
      this.charService.sendChat(this.input);
      this.input = "";
    }
  }

  scrollToBottom(): void {
    setInterval(() => {
      try {
        this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
      } catch (err) {}
    });
  }
}
