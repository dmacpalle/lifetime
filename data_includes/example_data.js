
PennController.ResetPrefix(null);
// --------------------------------------------------------------------------------------------------------------
// Preamble

// sequence
//PennController.Sequence( "instructions1", "info1", shuffle(randomize("critical"), randomize("filler")) );
PennController.Sequence( "instructions1", "info1", randomize("items"));


// --------------------------------------------------------------------------------------------------------------
// Consent form / Welcome
PennController( "instructions1" ,
    newHtml("instructions", "instructions.html")
        .print()
    ,
    newButton("consent button", "continue")
        .print()
        .wait()
);

// --------------------------------------------------------------------------------------------------------------
// Demographics

PennController( "info1" ,
    newHtml("info", "info2.html")
       .settings.log()
        .print()
    ,
    newButton("info button", "continue")
        .print()
        .wait( getHtml("info").test.complete())
);

// --------------------------------------------------------------------------------------------------------------
// Experimental items

PennController.Template( PennController.GetTable("subset.csv"), // use subset.csv
                 variable => PennController("items",
        newText("sentence1",variable.bio) // present biography in whole
            .settings.css("font-size", "30px")
            .print()
        ,
        newKey("bio"," ") // wait for spacebar
            .wait()
      ,     
        getText("sentence1")  // then remove
           .remove()   
      ,
// CRITICAL sentence: self-pace reading in chunks
        newText("critPro", variable.pronoun) 
            .settings.css("font-size", "30px")
            .print()
      ,
        newKey("critPro"," ")
        .wait()
      ,      
         getText("critPro")
           .remove() 
      ,                                    
        newText("critVerb", variable.verb)
            .settings.css("font-size", "30px")
            .print()    
      ,
        newKey("critVerb"," ")
        .wait()
      ,      
         getText("critVerb")
           .remove() 
      ,                                                    
        newText("critAdj", variable.adj)
            .settings.css("font-size", "30px")
            .print() 
      ,
        newKey("critAdj"," ")
        .wait()
      ,      
         getText("critAdj")
           .remove() 
      ,                                    
        newText("critObjNP", variable.objnp)
            .settings.css("font-size", "30px")
            .print()  
      ,
        newKey("critObjNP"," ")
        .wait()
      ,      
         getText("critObjNP")
           .remove()                          
      ,                                  
        newText("critTime", variable.time)
            .settings.css("font-size", "30px")
            .print()    
      ,
        newKey("critTime"," ")
        .wait()
      ,      
         getText("critTime")
           .remove()                           
      ,                                    
        newText("critSpillover", variable.spillover)
            .settings.css("font-size", "30px")
            .print() 
      ,
        newKey("critSpillover"," ")
        .wait()
      ,      
         getText("critSpillover")
           .remove()   

      ,
            newText("scale_title", "How naturally does this sentence fit the previous context?")
            .settings.css("font-size", "30px")
            .print()
      ,
       newScale("rating", 7)
      .settings.slider()
      .settings.before( newText("left", "completely unnatural") )
      .settings.after( newText("right", "perfectly fine") )
      .print()
      .wait()
   ,
        newButton("finish", "submit")
            .print()
           .wait()
  
       ,   
        getButton("finish")
           .remove()  
       ,      
        getScale("rating")
           .remove() 
    ,      
        getText("scale_title")
           .remove() 
      ,         
        newText("pleasewait2", "Please wait for the next biography.")
          .print()
    ,
        newTimer("wait", 1000)
            .start()
            .wait()
   ,
        getText("pleasewait2")
           .remove()
 ,
        getKey("bio").settings.log("all"),
        getKey("critPro").settings.log("all"),
        getKey("critVerb").settings.log("all"),
        getKey("critAdj").settings.log("all"),
        getKey("critObjNP").settings.log("all"),         
        getKey("critTime").settings.log("all"),  
        getKey("critSpillover").settings.log("all"),  
        getScale("rating").settings.log("all"),
)
                                            
// --------------------------------------------------------------------------------------------------------------
// Log results
                                          .log( "item" , variable.item_id )
                                          .log( "vital_status" , variable.vital_status )
                                          .log( "name" , variable.name )
                                          .log( "tense" , variable.tense )
                                          .log( "list" , variable.list )
    );
