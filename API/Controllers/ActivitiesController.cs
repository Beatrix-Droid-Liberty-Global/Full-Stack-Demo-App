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
        return Ok();

}
}