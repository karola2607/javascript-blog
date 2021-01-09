'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');


  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }


  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);


  /* [DONE]add class 'active' to the correct article */
  console.log('targetArticle:', targetArticle);
  targetArticle.classList.add('active');

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';




function generateTitleLinks(customSelector = ''){

  
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  function clearTitleList(){
    titleList.innerHTML = '';
  }

  clearTitleList();

  /* [DONE] find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){

    /* [DONE] get the article id */
  
    const articleId = article.getAttribute('id');


    /* [DONE]find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  


    /* [DONE] insert link into html variable */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();



function generateTags(){
/* [DONE] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');
  
    /* [DONE]START LOOP: for each tag */

    for(let tag of articleTagsArray) {

      /* [DONE] generate HTML of the link */

    const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
    

      /* [DONE] add generated code to html variable */

      html = html + tagHTML;
    
    /* [DONE] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){

        /* [DONE] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags [tag]++;
      }

    /* END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [DONE] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [DONE] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
      
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' +  tag + '">' + tag + '</a><span>' + allTags[tag] + '</span></li>';
    console.log(allTagsHTML);
     
  /* [NEW] END LOOP: for each tag in allTags */
 }
  
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();




function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

/* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

/* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');


  /* [DONE]  make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks) {
    
    /* [DONE] remove class active */
    activeTagLink.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */
  for(let allTagLink of allTagLinks) {
  
    /* [DONE] add class active */
    allTagLink.classList.add('active');
 
  /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');  
}


function addClickListenersToTags(){
  /* find all links to tags */
  const allLinks = document.querySelectorAll('.post-tags a');
  
  /* START LOOP: for each link */
  for(let allLink of allLinks){
    
    /* add tagClickHandler as event listener for that link */
    allLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();




function generateAuthors () {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for(let article of articles){

    /* [DONE] find authors wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);
   
    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get authors from .data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    

      /* [DONE] generate HTML of the link */
    const authorHTML = '<li><a href="#articleAuthor-' + articleAuthor + '"><span> ' + articleAuthor + '</span></a></li>';
    

      /* [DONE] add generated code to html variable */
    html = html + authorHTML;
    

    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
 
  }

  /* END LOOP: for every article: */
}

generateAuthors();




function authorClickHandler(event){
/* [DONE] prevent default action for this event */
  event.preventDefault();

/* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

/* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  

/* [DONE]  make a new constant "articleAuthor" and extract tag from the "href" constant */
  const articleAuthor = href.replace('#articleAuthor-', '');
  

/* [DONE] find all author links with class active */
  let activeAuthorLinks = document.querySelectorAll('a.active[href^="#articleAuthor-"]');

/* [DONE] START LOOP: for each active author link */
  for(let activeAuthorLink of activeAuthorLinks) {
    
  /* [DONE] remove class active */
    activeAuthorLink.classList.remove('active');

  /* [DONE] END LOOP: for each active author link */
  }

/* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

/* [DONE] START LOOP: for each found tag link */
  for(let allAuthorLink of allAuthorLinks) {
  
    /* [DONE] add class active */
    allAuthorLink.classList.add('active');

   /* [DONE] END LOOP: for each found author link */
  }

/* [DONE] execute function "generateTitleLinks" with author selector as argument */
  generateTitleLinks('[data-author="' + articleAuthor + '"]');  
}


function addClickListenersToAuthors(){
  /* find all links to authors */
  const allAuthorsLinks = document.querySelectorAll('.post-author a');

  /* START LOOP: for each link */
  for(let allAuthorsLink of allAuthorsLinks){
    
    /* add authorClickHandler as event listener for that link */
    allAuthorsLink.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
