
PennController.ResetPrefix(null);

PennController.Sequence( "instructions1", "info1", randomize("items") );

PennController( "instructions1" ,
    newHtml("instructions", "instructions.html")
        .print()
    ,
    newButton("consent button", "continue")
        .print()
        .wait()
);
PennController( "info1" ,
    newHtml("info", "info2.html")
       .settings.log()
        .print()
    ,
    newButton("info button", "continue")
        .print()
        .wait( getHtml("info").test.complete())
);

PennController.Template( PennController.GetTable("items.csv"),
                 variable => PennController("items",
        newText("sentence1",variable.Bio)
            .settings.css("font-size", "30px")
            .print()
        ,
        newKey("bio"," ")
            .wait()
      ,     
        getText("sentence1")
           .remove()   
        ,
        newText("sentence2", variable.Critical)
            .settings.css("font-size", "30px")
            .print()
        ,
            newKey("critical"," ")
            .wait()
,      
         getText("sentence2")
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
        getKey("critical").settings.log("all"),
        getScale("rating").settings.log("all"),
)
                                          .log( "item" , variable.Item_ID )
                                          .log( "vital_status" , variable.Vital_status )
                                          .log( "tense" , variable.Tense )
                                          .log( "list" , variable.List )
    );
