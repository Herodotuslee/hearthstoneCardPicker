const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    if(!req.session.deck){
      req.session.deck =[];
    }
    knex('cards')
    .then((results)=>{

      res.render("index",{cards:results,deck:req.session.deck});

    })

  },
  create: function(req, res){
    knex('cards')
    .insert(req.body)
    .then(()=>{
      req.session.save(()=>{
        res.redirect('/');
      })
    })
  },
// ADD TO THE SECTION
  add: function(req,res){

    knex('cards')
    .where('id', req.params.id)
    .then((result)=>{
      req.session.deck.push(result[0]);
      req.session.save(()=>{
        res.redirect('/');
      })

    })
  },
  remove: function(req,res){
    let deck = req.session.deck;
    console.log(deck.length)

    if(deck.length ==1){
      req.session.deck = [];
      req.session.save(()=>{
        res.redirect('/');
      })
      return ;
    }
    for(let i=0 ; i< deck.length;i++){
      // Interger vs String
      if(deck[i].id == req.params.id){
        deck.splice(i, 1);
        res.redirect('/');
        return;
        }

    }
    req.session.save(()=>{
      res.redirect('/');
    })

  }
}
