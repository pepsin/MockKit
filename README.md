#MockKit - Eliminate the backend hassle
![alt text](mockkit.png "MockKit Logo")

##Install MockKit

	sudo npm install mockkit -g

##Use MockKit

Prepare a `routes.json` in the working directory.

And write the routes like below:

	{
		#Label  | Route Rule  | Mock File
  		"index" : ["/", "./small_test.html"],
  		"dude" : ["/great_dude/hello", "./x.json"]
	}
	
And fire up

	mockkit use routes.json

And visit the `127.0.0.1:1234`, that's all.


##IMPORTANT
Currently not support multiple directory static file detection.

##LICENSE
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
