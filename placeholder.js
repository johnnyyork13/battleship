console.log('////////////////////////')
                //console.log('subloop');
                let x = this.nextAttack[0];
                let y = this.nextAttack[1];
                //got a hit so only shoot in adjacent blocks until ship sunk
                //figure out if ship is x or y orientation
                if (this.isRight && x < 9 &&
                    board.board[y][x + 1] !== undefined) {
                        console.log('went right', this.isRight)
                        x += 1;
                        attackHit = board.receiveAttack([x, y]);
                    if (attackHit && board.board[y][x].isShip) {
                        this.isRight = true;
                        this.nextAttack = [x, y];
                    } else {
                        this.nextAttack = this.savedAttack;
                        this.isRight = false;
                    }
                } else if (this.isLeft && x > 0 && 
                    board.board[y][x - 1] !== undefined) {
                        console.log('went left', this.isLeft)
                        x -= 1;
                        attackHit = board.receiveAttack([x, y]);
                    if (attackHit && board.board[y][x].isShip) {
                        this.isLeft = true;
                        this.nextAttack = [x, y];
                    } else {
                        this.nextAttack = this.savedAttack;
                        this.isLeft = false;
                    }
                } else if (this.isUp && y > 0 &&
                    board.board[y - 1] !== undefined) {
                        console.log('went up', this.isUp)
                        y -= 1;
                        attackHit = board.receiveAttack([x, y]);
                        if (attackHit) {
                            this.isUp = true;
                            this.nextAttack = [x,y];
                        } else {
                            this.nextAttack = this.savedAttack;
                            this.isUp = false;
                        }
                } else if (this.isDown && y < 9 &&
                    board.board[y + 1] !== undefined) {
                        console.log('went down', this.isDown)
                        y += 1;
                        attackHit = board.receiveAttack([x, y]);
                        if (attackHit) {
                            this.isDown = true;
                            this.nextAttack = [x,y];
                        } else {
                            this.nextAttack = this.savedAttack;
                            this.isDown = false;
                            this.gotAHit = false;
                        }
                } else if (!this.isRight && !this.isLeft && !this.isUp && !this.isDown) {
                    this.gotAHit = false;
                    this.isRight = true;
                    this.isLeft = true;
                    this.isUp = true;
                    this.isDown = true;
                }


                