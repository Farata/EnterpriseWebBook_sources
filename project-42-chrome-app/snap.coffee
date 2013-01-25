video = undefined
localMediaStream = undefined
canvas = undefined
ctx = undefined
sendButton = undefined
wsApp = undefined

snapshot = ->
  if localMediaStream
    ctx.drawImage video, 0, 0, canvas.width, canvas.height

    # "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
    document.querySelector("img").src = canvas.toDataURL("image/webp")
    sendButton.disabled = false

sendToServer = ->
  image = ctx.getImageData(0, 0, canvas.width, canvas.height)
  buffer = new ArrayBuffer(image.data.length)
  bytes = new Uint8Array(buffer)
  i = 0

  while i < bytes.length
    bytes[i] = image.data[i]
    i++

  wsApp.sendMessage(bytes)
  sendButton.disabled = true

  return

window.onload = ->
  sendButton = document.getElementById "sendBtn"
  sendButton.addEventListener "click", sendToServer, false
  sendButton.disabled = true

  wsApp = new WebSocketApp
  wsApp.launch()

  video = document.querySelector("video")
  video.addEventListener "click", snapshot, false
  canvas = document.querySelector("canvas")
  ctx = canvas.getContext("2d")
  localMediaStream = null

  browserUserMedia = navigator.webkitGetUserMedia or navigator.mozGetUserMedia or navigator.getUserMedia

  throw "Your browser doesn't support WebRTC"  unless browserUserMedia

  getUserMedia = browserUserMedia.bind(navigator)

  getUserMedia video: true, ((stream) ->
    video.src = window.URL.createObjectURL(stream)
    localMediaStream = stream
  ), onFailSoHard

  return


onFailSoHard = ->