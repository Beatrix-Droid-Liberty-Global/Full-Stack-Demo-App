using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers;
public class ActivitiesController: BaseApiController
{
  

    [HttpGet] //api activities   -get all activities
    public async Task <ActionResult<List<Activity>>> GetActivities()
    {
        // this class is derived from base controller so we use the Mediator value created there
        return await Mediator.Send(new Application.Activities.List.Query());
      
    }

    [HttpGet("{id}")]//api activitie/Guid

    public async Task<ActionResult<Activity>>GetActivity(Guid id)
    {
        return await Mediator.Send(new Details.Query{Id=id});

    }

[HttpPost]
//not retuning anything, we just get the response of the http request
public async Task<IActionResult>CreateActivity(Activity activity)
    {
    await Mediator.Send(new Create.Command{Activity=activity});
    return Ok();
    }


[HttpPut("{id}")]
//not retuning anything, we just get the response of the http request
public async Task<IActionResult>EditActivity(Guid id, Activity activity)
    {
    activity.Id=id;
    await Mediator.Send(new Edit.Command{Activity=activity});
    return Ok();
    }


    
[HttpDelete("{id}")]

public async Task<IActionResult> DeleteActivity(Guid id)
{

    await Mediator.Send(new Delete.Command{Id=id});
    return Ok();
}
}