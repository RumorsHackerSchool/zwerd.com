---
layout: post
title: Nach Riddles!
excerpt: k, so I finished the application, now it's on Google Play, the name of the app is "Habia Histom Meni Kedem" of "Nach Riddle"

---

Ok, so I finished the application, now it's on Google Play, the name of the app is "Habia Histom Meni Kedem" of "Nach Riddle". For me it was realy interesting, and now I have knowledge in React Native, may be when I step foreword I will develop more applications in React-Native, but maybe not. For sure I know that I will be developer in script languages such Python and JavaScripts because of Cyber stream area, I know that I need that knowledge, I have some book in reverse engineer using Python.

So, my app is very good I think, I got good and bad feedback about that, the game is really hard so I'm sure that some people will leave that game because of the difficulty.

I think to change some stuff in the app, maybe it will be good:
- Give the user the possibility to learn the material which the riddle are based on.
- Move the reset button to the opening screen.
- changing the app to work with Flex.
- add some price to the end of the game.
- add some music.


I haven't used Readex yet but I will, some of the code is presented here:
```
render() {
  let width = Dimensions.get('window').width;
  let font = width / 10;
  console.log(font)
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../img/opening-img2.jpg')}
      >
        <View style={styles.backdropView}>
          <Text style={{paddingTop: 20, fontFamily: 'stam1', textAlign: 'center', color: '#2196F3', fontSize:font}}>אביעה חידות מני קדם</Text>
          <Image
            style={{width: 360, height: 165, resizeMode: 'stretch', }}
            source={require('../img/Book.png')}
          />
            <Text style={styles.lineText}>1188 חידות על הנביא</Text>
            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Riddles', { home: this.onChangeCount.bind(this)})}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{this.checkBeginning()}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Introduction')}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>הוראות</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('About')}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>אודות</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </Image>
    </View>
    </ScrollView>
  )
```

<br></p>
![HomeScreen](/assets/images/app2.jpg "HomeScreen"){:class="img-responsive"}{:height="500px" width="400px"}
<p dir="rtl">
<br>
<br>

<br>
<br>
<br>


<br></p>
![Riddle](/assets/images/app3.jpg "Riddle"){:class="img-responsive"}{:height="500px" width="400px"}
<p dir="rtl">
<br>

<br>
<br>
<br>


<br></p>
![wrong](/assets/images/app4.jpg "wrong"){:class="img-responsive"}{:height="500px" width="400px"}
<br>
<br>
<br>

![diamonds](/assets/images/app5.jpg "diamonds"){:class="img-responsive"}{:height="500px" width="400px"}
<br>
<br>
<br>


![diamonds2](/assets/images/app1.jpg "diamonds2"){:class="img-responsive"}{:height="500px" width="400px"}
