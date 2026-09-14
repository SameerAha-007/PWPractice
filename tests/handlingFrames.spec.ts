import {test,expect,Locator} from "@playwright/test";

test("handling frames",async({page})=>{

    await page.goto("https://ui.vision/demo/webtest/frames/");

    //total number of frames
    const frames = page.frames();
    console.log(frames.length);

    // using page.frame()
    const frame = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1"});

    if(frame){
        await frame.locator("input[name=mytext1]").fill("Sameer");
        //await frame.fill("input[name=mytext1]","Sameer"); //(or)
    }
    else{
        console.log("frame is not available");
    }
    await page.waitForTimeout(3000);

    //using page.frameLocator()
    const inputBox =  page.frameLocator("frame[src='frame_2.html']").locator("input[name=mytext2]");
    await inputBox.fill("Sameer");
    await page.waitForTimeout(3000);

})

//inner frames
test.only("handling innerFrames",async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3=page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3"});
    if(frame3){
        const childFrames=frame3.childFrames();//it returns array of frames
        console.log(childFrames.length);
        //to access elements in innerframe
        const radio = childFrames[0].getByLabel("I am a human");
        await radio.check();
        await page.waitForTimeout(3000);
    }
    else{
        console.log("frame not available");
    }

    
    
})