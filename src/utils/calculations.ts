export const getPartyOrientation = (answers: any) => {
    const leftRightAnswers: any = [];
    const topBottomAnswers: any = [];
    const eastWestAnswers: any = [];
    answers.forEach((answer: any) => {
        const agreeLevel = (answer.agreeLevel - 3) * 2.5;
        switch (answer.Question.position) {
        case "left":
            leftRightAnswers.push(agreeLevel * -1);
            break;
        case "right":
            leftRightAnswers.push(agreeLevel);
            break;
        case "top":
            topBottomAnswers.push(agreeLevel * -1);
            break;
        case "bottom":
            topBottomAnswers.push(agreeLevel);
            break;
        case "top-left":
            topBottomAnswers.push(agreeLevel * -1);
            leftRightAnswers.push(agreeLevel * -1);
            break;
        case "top-right":
            topBottomAnswers.push(agreeLevel * -1);
            leftRightAnswers.push(agreeLevel);
            break;
        case "bottom-left":
            topBottomAnswers.push(agreeLevel);
            leftRightAnswers.push(agreeLevel * -1);
            break;
        case "bottom-right":
            topBottomAnswers.push(agreeLevel);
            leftRightAnswers.push(agreeLevel);
            break;
        case "east":
            eastWestAnswers.push(agreeLevel * -1);
            break;
        case "west":
            eastWestAnswers.push(agreeLevel);
            break;
        }
    });

    const lr = !leftRightAnswers.length ? 0 : leftRightAnswers.reduce((a: any, b: any) => a + b, 0) / leftRightAnswers.length;
    const tb = !topBottomAnswers.length ? 0 : topBottomAnswers.reduce((a: any, b: any) => a + b, 0) / topBottomAnswers.length;
    const ew = !eastWestAnswers.length ? 0 : eastWestAnswers.reduce((a: any, b: any) => a + b, 0) / eastWestAnswers.length;
    const leftRight = Math.floor(lr)
    const topBottom = Math.floor(tb)
    const eastWest = ew

    console.log('leftRight:', leftRight, lr, 'topBottom:', topBottom, tb, 'eastWest:', eastWest, ew);

    return { leftRight, topBottom, eastWest }
}

export const getPartyAgreePercentage = (partyAnswers: any, userAnwers: any): number => {
    const differences = [] as any

    partyAnswers.forEach((partyAnswer: any) => {
        const userAnswer = userAnwers.find((a: any) => a.Question.id === partyAnswer.Question.id)
        if (userAnswer.agreeLevel != 0) {
            const disagreeLevel = Math.abs(partyAnswer.agreeLevel - userAnswer.agreeLevel)
            differences.push(disagreeLevel)
        }
    });

    if (!differences.length) return 0

    const disagreeTotal = differences.reduce((a: any, b: any) => a + b, 0) / differences.length
    const AgreePercentage = Math.round((100 - disagreeTotal * 25) * 100) / 100
    return AgreePercentage
}