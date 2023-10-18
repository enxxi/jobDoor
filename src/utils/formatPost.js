const formatPosts = posts => {
    return posts.map(post => ({
        채용공고_id: post.id,
        회사명: post['Company.name'],
        국가: post['Company.nation'],
        지역: post['Company.country'],
        채용포지션: post.position,
        채용보상금: post.award,
        사용기술: post.skill,
    }));
};

const formatPost = post => {
    return {
        채용공고_id: post.id,
        회사명: post.Company.name,
        국가: post.Company.nation,
        지역: post.Company.country,
        채용포지션: post.position,
        채용보상금: post.award,
        사용기술: post.skill,
        채용내용: post.content,
        이회사의다른채용공고: post.Company.Posts.map(otherPost => otherPost.id),
    };
};
export { formatPosts, formatPost };
