type Group = {
    name:string
}

type User = 
{       id?:number,
        email:string,
        first_name:string,
        last_name:string,
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


interface ListRespornse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}