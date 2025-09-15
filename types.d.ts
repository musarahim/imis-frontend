type Group = {
    name:string
}

type NavItem = {
  name: string
  href: string
  icon: ElementType
  current: boolean,
  children?: { name: string; href: string, current:boolean }[]
}

type User = 
{       id?:number,
        email:string,
        first_name:string,
        last_name:string,
        username:string,
        profile_pic?:string,
         password:string,
         re_password:string

}

type LoginUser = {
    username:string,
    password:string
}
type UserEmail={
    email:string
}

interface Option {
    value: string
    label: string
  }


interface MenuItem {
  name: string;
  href: string;
  current?: boolean;
}

interface MenuDropdownProps {
  item: {
    name: string;
    children: MenuItem[];
  };
}

type InstitutionForm = {
  email: string;
  alternative_email: string;
  username: string;
  phone: string;
  alternative_phone_number: string;
  password: string;
  re_password: string;
  name: string;
  district: string;
  institution_type: string;
  landline: string;
  contact_person: string;
  contact_person_phone: string;
  alternative_contact_person: string;
  alternative_contact_person_phone: string;
  logo: string | File;
  
}

type institution = {
        name: string;
        district: string;
        alternative_email: string;
        institution_type: string;
        landline: string;
        contact_person: string;
        contact_person_phone: string;
        alternative_contact_person: string;
        alternative_contact_person_phone: string;
        logo: string | File;
    }
type InstitutionRegForm = {
  email: string;
  username: string;
  phone: string;
  alternative_phone_number: string;
  password: string;
  re_password: string;
  institution: institution;
  
}

interface ListRespornse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface District {
  id: number;
  name: string;
  code: string;
}