export interface Project{
    /*
private Long id;
    private Long authorId;
    private String authorName;
    private String title;
    private String description;
    */

    id:number;
    title:string;
    description:string;
    creationDate:string;
    publicationDate:string;
    state:string;
    meetingsEnabled:boolean;

}