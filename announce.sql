create database mymoney ;
create user adminmymoney@localhost identified by 'mymoney' ;
grant all privileges on mymoney.* to adminmymoney@localhost ;
