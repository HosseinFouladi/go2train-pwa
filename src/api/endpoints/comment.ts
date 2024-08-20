export const CommentsEndPoint={
    course_comment:(course_id:number)=>`/v3/comment/course/${course_id}`,
    new_course_comment:(course_id:number)=>`/v3/comment/course/${course_id}`,
    course_comment_rate:(course_id:number)=>`/v3/comment/course/rate/${course_id}`,
    comment_reaction:'/v3/comment/reaction'
}