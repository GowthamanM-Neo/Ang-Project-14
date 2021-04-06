import { Component } from '@angular/core';
import { City } from 'src/model/city';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  database:any={};
  userName:any;
  users:any;
  countries:any;
  cities:any;
  city:any = {};
  countryName:any;
  cityName:any;
  genderValue:any;
  aadharNum:any="";
  ssn:String="";
  errorMessage:any;
  isIndia:boolean = false;
  isUs:boolean = false;
  userMessage:any;
  constructor(private apiService:ApiService){
    this.apiService.getCountries().subscribe((data)=>{
      this.countries = data;
    });

    this.apiService.getUsers().subscribe((data)=>{
      this.database=data;
    })
  }
  getCity(){
    if(this.countryName === 'India'){
      this.isIndia = true;
    }else{
      this.isIndia = false;
    }
    if(this.countryName === 'United States of America'){
      // this.countryName='United States';
      this.city.country = 'United States';
    this.apiService.getCities(this.city)
    .subscribe((data)=>{
      this.cities = data.data;
    });
      this.isUs = true;
    }else{
      this.isUs = false;
    }
    if(!this.isUs)
    this.city.country = this.countryName;
    this.apiService.getCities(this.city)
    .subscribe((data)=>{
      this.cities = data.data;
    });
  }

  submit(){
    console.log(this.ssn);
    console.log(this.aadharNum.length);
    var numbers = /^[0-9]+$/;
    if(this.isIndia){
      if(this.aadharNum.length === 12 && this.aadharNum.match(numbers)){
        this.errorMessage = '';
        this.users = this.database.filter((data: 
          { firstName: any;
            country:any;
            city:any;
            gender:any;
          }) => (data.firstName === this.userName && data.country === this.countryName.toLowerCase() && data.city === this.cityName.toLowerCase() && data.gender === this.genderValue));
        console.log(this.users);
      }else{
        this.errorMessage = 'Aadharcard number is not valid';
      }
    }else if(this.isUs){
      if(this.ssn.length === 9 && this.ssn.match(numbers)){
        this.errorMessage = '';
        this.users = this.database.filter((data: 
          { firstName: any;
            country:any;
            city:any;
            gender:any;
          }) => (data.firstName === this.userName && data.country === this.countryName.toLowerCase() && data.city === this.cityName.toLowerCase() && data.gender === this.genderValue));
        console.log(this.users);
      }else{
        this.errorMessage = 'SSN number is not valid';
      }
    }else{
      this.users = this.database.filter((data: 
        { firstName: any;
          country:any;
          city:any;
          gender:any;
        }) => (data.firstName === this.userName && data.country === this.countryName.toLowerCase() && data.city === this.cityName.toLowerCase() && data.gender === this.genderValue));
      console.log(this.users);
    }
    if(this.users.length === 0){
      this.userMessage='User not found!';
    }else{
      this.userMessage='';
    }
    this.aadharNum="";this.ssn="";
  }
}
