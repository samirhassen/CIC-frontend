import { Component, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { homeService } from './home_service';
import { isPlatformBrowser } from '@angular/common';
import { MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConstantRoute } from '../../ConstantsRoutes';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-home',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  @ViewChild('embedContainer', { static: false }) embedContainer!: ElementRef;
  screenWidth: number = 0;
  screenHeight: number = 0;
  embedConfig: any;
  isBrowser = false;
  constructor(private snackBar: MatSnackBar,private homeService: homeService, private route: ActivatedRoute, private http: HttpClient, private reportService: homeService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      debugger
      this.route.queryParams.subscribe((params: { [x: string]: any }) => {
        const token = params['token'];
        if (token) {
          // 🔹 Call service instead of hardcoding URL
          this.homeService.getAuthenticateToken(token).subscribe({
            next: (res: any) => {
              console.log('Validation result:', res);

              if (res.result.status==='error') {
                this.snackBar.open(ConstantRoute.tokenErrorMassege, '', {
                  duration: 3000, // auto close after 8s
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['snackbar-error'] // optional custom style
                });
                //window.location.href = ConstantRoute.redirectUrl;

                setTimeout(() => {
                  window.location.href = ConstantRoute.redirectUrl;
                }, 3000);
              }
              else {
                this.updateScreenSize();
                this.getPowerBIReport();
              }
            },
            error: (err: any) => console.error('Error:', err)
          });
        }
      });


    }
  }


  @HostListener('window:resize')
  onResize() {
    this.updateScreenSize();
  }
  private updateScreenSize(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight - 70;
  }

  getPowerBIReport() {
    this.reportService.getReport().subscribe({
      next: async (res: any) => {
        if (res) {

          const pbi = await import('powerbi-client');

          const embedConfiguration: any = {
            type: 'report',
            id: res.reportID,
            embedUrl: res.embedUrl,
            accessToken: res.token,
            tokenType: pbi.models.TokenType.Embed,
            settings: {
              panes: {
                filters: { visible: true },
                pageNavigation: { visible: true }
              }
            }
          };

          const powerbi = new pbi.service.Service(
            pbi.factories.hpmFactory,
            pbi.factories.wpmpFactory,
            pbi.factories.routerFactory
          );

          powerbi.embed(this.embedContainer.nativeElement, embedConfiguration);

        } else {
          console.error('Invalid response:', res);
        }
      },
      error: (err: any) => {
        console.error('Error fetching report:', err);
      }
    });
  }
}