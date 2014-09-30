( () ->

  foo = ''

  ## test-block-start ##
  bar = () ->
    myVar = 12
  ## test-block-end ##

  return {
    bar: "bar"
    ## test-block-start ## , one: "one" ## test-block-end ##
  }
)()
