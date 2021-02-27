# Auto Dict Unpack (MaxMSP/Jitter)
Ever lose your mind trying to unpack massive dictionaries in Max8? #bigdata = bigproblems 📊 🤯 📈

Try this useful little js helper tool to automagically script the arguments required to parse dictionaries in MaxMSP / Jitter  
  
* Checks for types (Float, Int,Symbols)  
* Creates a `[dict.unpack]` object with an argument for every key in the dictionary  
* Spawns the appropriate UI objects and comment annotations in the parent and in the subpatcher  
  
1. Save this script as `autodictunpack.js` in your [Search Paths](https://docs.cycling74.com/max8/vignettes/search_path)
2. Instantiate `[js autodictunpack.js]` in any patch you're working on

![](http://user-images.githubusercontent.com/43569216/109392287-62bfcd80-796f-11eb-94e3-869e9db1a82e.mp4)


![autodictunpackgit](https://user-images.githubusercontent.com/43569216/109392428-19bc4900-7970-11eb-95c2-b5e6d7bb83c8.gif)
