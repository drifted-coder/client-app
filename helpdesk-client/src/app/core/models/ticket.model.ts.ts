export interface Ticket{
 _id:string;
 title:string;
 description:string;
 status:string;
 priority:string;
 category:string;
 assignedTo?:string;
}
