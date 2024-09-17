
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'

import App from '../App';

//test for all renders in the home screen


test('Add Event Button', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: "Add New Event" });
    expect(buttonElement).toBeInTheDocument();
});

//test for showing form element after the addEvent click
test('clicking the addEvent button',async()=>{
    user.setup();
    render(<App/>);
    const buttonElement = screen.getByRole('button', { name: "Add New Event" });
    await user.click(buttonElement);
    expect(screen.getByTestId("form-id")).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
    expect(screen.getAllByRole('spinbutton')).toHaveLength(1);
    expect(screen.getByRole('button')).toBeInTheDocument();   
})
//test for adding an event to the list
test('adding an event to the list',async()=>{
    user.setup()
    render(<App />);
    let inputElement = screen.getAllByRole('textbox');
    let numberElement = screen.getByRole('spinbutton');
    await user.type(inputElement[0],"Test");
    expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
    await user.type(inputElement[1],"Bangalore");
    expect(screen.getByDisplayValue("Bangalore")).toBeInTheDocument();
    await user.type(inputElement[2],"https://www.bing.com/images/search?view=detailV2&ccid=DpcLyyRC&id=C06EBA7B9EE8E12CF45CE1473B8A03F739C4EB43&thid=OIP.DpcLyyRCeTWoiiMNdCTXxQHaEK&mediaurl=https%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fBest-Nature-Full-HD-Images-For-Desktop.jpg&exph=1080&expw=1920&q=images&simid=608028775680775746&FORM=IRPRST&ck=336F6EAF87E87775870C13A6FB79AF35&selectedIndex=2&itb=0");
    expect(screen.getByDisplayValue("https://www.bing.com/images/search?view=detailV2&ccid=DpcLyyRC&id=C06EBA7B9EE8E12CF45CE1473B8A03F739C4EB43&thid=OIP.DpcLyyRCeTWoiiMNdCTXxQHaEK&mediaurl=https%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fBest-Nature-Full-HD-Images-For-Desktop.jpg&exph=1080&expw=1920&q=images&simid=608028775680775746&FORM=IRPRST&ck=336F6EAF87E87775870C13A6FB79AF35&selectedIndex=2&itb=0")).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
    let dateElement = screen.getByTestId('date-id');
    await user.type(dateElement,"2024-09-20T09:38");
    expect(screen.getByDisplayValue("2024-09-20T09:38"));
    await user.type(numberElement,String(100));
    expect(screen.getAllByDisplayValue("100"));
    const submit = screen.getByRole('button',{name:"Add Event"});
    await user.click(submit);
    //making sure that page redirects to home page
    const buttonElement = screen.getByRole('button', { name: "Add New Event" });
    expect(buttonElement).toBeInTheDocument();

},50000)

