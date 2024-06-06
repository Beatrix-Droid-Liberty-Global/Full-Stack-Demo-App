using AutoMapper;
using Domain;
using MediatR;
using Persistence;


namespace Application.Activities;

public class Edit
{
    //queries return data, commands do not
    public class Command: IRequest
    {
        public Activity Activity {get;set;}
    }
public class Handler: IRequestHandler<Command>
{    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public Handler(DataContext context, IMapper mapper)
    {
        _mapper=mapper;
        _context=context;    
    }
    public async Task Handle(Command request, CancellationToken cancellationToken){
        Activity activity= await _context.Activities.FindAsync(request.Activity.Id);

        //to update the title. If the user has not updated the title, the the paremeter is null, so just set is as the old title (activity.title)
        _mapper.Map(request.Activity, activity);
        await _context.SaveChangesAsync();
        }
}
}