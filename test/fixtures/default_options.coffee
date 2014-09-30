( () ->

  foo = ''

  ## test-block-start ##
  bar = () ->
    myVar = 12
  ## test-block-end ##

  return {
    bar: "bar"
    ## test-block-start ## , fizz: "buzz" ## test-block-end ##
  }
)()
