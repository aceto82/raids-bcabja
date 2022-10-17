import { Component, OnInit } from '@angular/core';
import { GymsService } from 'src/app/services/gyms.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  theme!: string
  private darkModeMediaQuery: MediaQueryList | undefined

  constructor(private gymServ: GymsService) { }

  ngOnInit(): void {
    this.theme = "light"
    this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (this.darkModeMediaQuery.matches === true) {
      this.theme = "dark"
    }    
    this.darkModeMediaQuery.addListener((e) => {
      const darkModeOn = e.matches;
      console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
    });
    this.toggleTheme()
    //this.gymServ.setThemeMode(this.theme)
  }

  toggleTheme() {    
    this.theme = this.theme == "light" ? "dark" : "light"
    this.toggleCSS(this.theme, false)
    this.toggleCSS(this.theme == "light" ? "dark" : "light", true)
    //this.gymServ.setThemeMode(this.theme)
  }

  private toggleCSS(el: string, remove: boolean): void {
    const element = document.getElementById("cfg" + el);
    if (remove) {
      element?.setAttribute("media", "all")
      if (element?.hasAttribute('disabled')) {
        element?.removeAttribute('disabled')
      }
    } else {
      element?.setAttribute("disabled", "disabled")
      element?.setAttribute("media", "not all")
    }
  }

}
