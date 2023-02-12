import * as React from 'react';
import styles from './Aadclient.module.scss';
import { IAadclientProps } from './IAadclientProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { AadHttpClient, HttpClientResponse, IHttpClientOptions } from '@microsoft/sp-http';

export interface weatherforecastdetails {
  date : string;
  summary : string;
  temperatureC : string;
  temperatureF : string
}

export interface IAuthSpFxState {
  weatherforecast:weatherforecastdetails[]
}

const body: string = JSON.stringify({
  'name1': "abc"
  
});



const requestHeaders: Headers = new Headers();
  //For an OAuth token
  requestHeaders.append('apim', 'abc');
  requestHeaders.append('apimkey', 'key');
  //For Basic authentication
 

  const httpClientOptions: IHttpClientOptions = {
    headers: requestHeaders
  };



export default class Aadclient extends React.Component<IAadclientProps, IAuthSpFxState> {

 

  componentDidMount(): void {
    this.props.webpartcontext.aadHttpClientFactory.getClient('api://7d10da7e-175a-4bc6-b31b-6ea34c56f324')
    .then((client: AadHttpClient): void => {
      console.log(client);
      client.get('https://apiaadclient01.azurewebsites.net/WeatherForecast', AadHttpClient.configurations.v1,httpClientOptions)
        .then((response: HttpClientResponse): Promise<weatherforecastdetails[]> => {
              return response.json();
        })
        .then((weatherforecastdetail: weatherforecastdetails[]): void => {
                 this.setState({weatherforecast:weatherforecastdetail});
                console.log("weatherforecastdetail" + weatherforecastdetail[0].summary);
                console.log("weatherforecastdetail" + this.state.weatherforecast[0].summary);
              })
              .catch((e:Error)=> console.log(e));
      
        })
        .catch((e:Error)=> console.log(2));
        
  }


  public render(): React.ReactElement<IAadclientProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.aadclient} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
           { this.state === null || this.state.weatherforecast === null ? "hi12345": this.state.weatherforecast.map(w=> w.summary ) }
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
            <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
          </ul>
        </div>
      </section>
    );
  }
}
