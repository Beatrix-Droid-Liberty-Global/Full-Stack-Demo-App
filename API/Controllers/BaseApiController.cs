
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController: ControllerBase
{
    private IMediator _mediator;

    // protected means that it can be used only by this class and the ones that are derived from it
    //if the IMediator is null or is not in this controller's property go and get it again
    protected IMediator Mediator => _mediator ??=  HttpContext.RequestServices.GetService<IMediator>();
}