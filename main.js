prediction_1 = ""
prediction_2 = ""



Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});


Webcam.attach(camera);

camera = document.getElementById("camera");
function capture_img()
{
    Webcam.snap(function(data_uri) {
       document.getElementById("result_camera").innerHTML ='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9G87QkZbW/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    ;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
  }

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function predict_img(error, results)
{
    if (error) 
    {
        console.error(error);
    } else 
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
       
        speak()
        if(results[0].label == "Yo")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if(results[0].label == "Nice")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Thumbs Up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }   
       
       
    }}