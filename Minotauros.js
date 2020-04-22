class Minotauros {

    constructor() {
        this.registeredTokens = [];
    }

    // Return the array of currently registered tokens
    getTokens(){
        return this.registeredTokens;
    }

    // Return number of currently registered tokens
    getNumTokens(){
        return this.registeredTokens.length;
    }

    // Used to manually register a token
    registerToken(angle1, angle2, angle3, name){
        let newToken = [angle1, angle2, angle3, name, -1, -1];
        this.registeredTokens.push(newToken);
    }

    // Used to update the position of the token
    updateTokenPosition(x1, y1, x2, y2, x3, y3, name){
        let x = (x1 + x2 + x3)/3;
        let y = (y1 + y2 + y3)/3;

        // Loop through all tokens, find by name the one to update, and update its X and Y coordinates
        for(let i = 1; i < this.registeredTokens.length; i++){
            if(this.registeredTokens[i][3].localeCompare(name) == 0){
                this.registeredTokens[i][4] = x;
                this.registeredTokens[i][5] = y;
            }
        }

        // Return the coordinates as an array
        return [x, y];
    }

    // Used to register the token based on touch
    registerTokenTouch(theTouch){


        let theIToken = this.identifyToken(theTouch);

        if((theIToken[0] != -1) && (theIToken[3].localeCompare("Error: Number of Touches is not 3") != 0)){
            let theTokens = this.getTokens();
            let tokenName = "Token " + (theTokens.length + 1).toString();
            this.registerToken(theIToken[0], theIToken[1], theIToken[2], tokenName);
            return theTokens[theTokens.length - 1];
        } else {
            return theIToken;
        }

    }

    // Used to identify a token
    identifyToken(theTouch){
        // Check if the number of touches is 3
        if(theTouch.targetTouches.length == 3){

            // Get all x and y coordinates for the 3 touches
            let t1X = theTouch.targetTouches.item(0).screenX;
            let t1Y = theTouch.targetTouches.item(0).screenY;

            let t2X = theTouch.targetTouches.item(1).screenX;
            let t2Y = theTouch.targetTouches.item(1).screenY;

            let t3X = theTouch.targetTouches.item(2).screenX;
            let t3Y = theTouch.targetTouches.item(2).screenY;

            // Calculate the side lengths of the triangle
            let side12 = Math.sqrt(Math.pow(Math.abs(t1X - t2X),2) + Math.pow(Math.abs(t1Y - t2Y), 2));
            let side13 = Math.sqrt(Math.pow(Math.abs(t1X - t3X),2) + Math.pow(Math.abs(t1Y - t3Y), 2));
            let side23 = Math.sqrt(Math.pow(Math.abs(t2X - t3X),2) + Math.pow(Math.abs(t2Y - t3Y), 2));

            // Calculate the angles using the side lengths
            let angle1 = Math.atan(side23/side12);
            let angle2 = Math.atan(side13/side12);
            let angle3 = 1.80 - (angle1 + angle2);

            // Loop through all the tokens to see if the token is already registered or not
            let theTokens = this.getTokens();

            let isRegistered = false;

            let ag1 = Math.round(angle1 * 100);
            let ag2 = Math.round(angle2 * 100);
            let ag3 = Math.round(angle3 * 100);
            let registeredPosition = -1;

            for(let i = 0; i < theTokens.length; i++){
                let tag1 = Math.round(theTokens[i][0] * 100);
                let tag2 = Math.round(theTokens[i][1] * 100);
                let tag3 = Math.round(theTokens[i][2] * 100);

                // Check for each pairing order
                if( (ag1 === tag1 && ag2 === tag2 && ag3 === tag3) || (ag1 === tag1 && ag2 === tag3 && ag3 === tag2) || (ag1 === tag2 && ag2 === tag1 && ag3 === tag3) || (ag1 === tag2 && ag2 === tag3 && ag3 === tag1) || (ag1 === tag3 && ag2 === tag2 && ag3 === tag1) || (ag1 === tag3 && ag2 === tag1 && ag3 === tag2)){
                    isRegistered = true;
                    registeredPosition = i;
                    break;
                }
            }

            // If the token is registered, return it
            if(isRegistered){
                return theTokens[registeredPosition];
            }
            // If the token is not registered, return an error token
            else{
                return [-1, -1, -1, "Error: Token is not registered"];
            }
        }
        // If the number of detected touches is not 3, return an error token
        else {
            return [-1, -1, -1, "Error: Number of Touches is not 3"]
        }
    }

    // Used to confirm that a token has been removed from the touch screen
    touchRemoved(theTouch){

        if(theTouch.targetTouches.length < 3){
            return true;
        } else{
            return false;
        }
    }
}
