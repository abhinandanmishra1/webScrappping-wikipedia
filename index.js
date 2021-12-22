const axios = require('axios')
const { JSDOM } = require('jsdom')
const express = require('express');
  
// Initialize App
const app = express();
var history=""
var otherUses=""
var useInOtherWritingSystem="" 

async function run(){
    await axios
  .get('https://en.wikipedia.org/wiki/A')
  .then(({ data: html }) => {
    const { document } = new JSDOM(html).window
   
    // console.log(document)
    var html = "";
    var elems = document.getElementsByTagName("*");
    var size=elems.length
    // size=6
  
    flag=false;
    for (var i = 0; i < size; i++) {
        if(elems[i].id==="Use_in_writing_systems"){
            break;
        }
        else if(flag)
         {
             history += elems[i].outerHTML;
         }

        else if(elems[i].id==="History"){
            console.log(i);
            // console.log("hello")
            flag=true;
        }  
        
    }
    var flag=false;
    
    for (var i = 0; i < size; i++) {
        if(elems[i].id==="Other_uses"){
            break;
        }
        else if(flag)
         {
            useInOtherWritingSystem += elems[i].outerHTML;
         }

        else if(elems[i].id==="Use_in_writing_systems"){
            console.log(i);
            // console.log("hello")
            flag=true;
        }  
        
    }
    flag=false;
    for (var i = 0; i < size; i++) {
        if(elems[i].id==="Related_characters"){
            break;
        }
        else if(flag)
         {
            otherUses+= elems[i].outerHTML;
         }

        else if(elems[i].id==="Other_uses"){
            console.log(i);
            // console.log("hello")
            flag=true;
        }  
        
    }
    // console.log(history)
    
    
  })
}

function start(){
    run().then(()=>{
        // console.log(history);
        // console.log(useInOtherWritingSystem);
        // console.log(otherUses);
        app.use('/', (req, res, next) => {
            // console.log(document)
            var styles=' <link rel="stylesheet" href="/w/load.php?lang=en&amp;modules=ext.cite.styles%7Cext.uls.interlanguage%7Cext.visualEditor.desktopArticleTarget.noscript%7Cext.wikihiero%2CwikimediaBadges%7Cjquery.makeCollapsible.styles%7Cskins.vector.styles.legacy%7Cwikibase.client.init&amp;only=styles&amp;skin=vector" />' +
            '<link rel="stylesheet" href="/w/load.php?lang=en&amp;modules=site.styles&amp;only=styles&amp;skin=vector"/>';
            res.render('index.pug', { history:history ,useInOtherWritingSystem:useInOtherWritingSystem,otherUses:otherUses,style:styles});
          });
        
    })
    
    
    
      app.listen(5000, () => {
        console.log('App listening on port 5000');
      });
    
   
      

    
    
    
}

start();




  