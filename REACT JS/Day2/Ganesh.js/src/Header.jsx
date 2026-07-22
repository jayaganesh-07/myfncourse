

const Header = () => {
    return (
        <>

            <div>
                <h1>About Me</h1>
                <p>My name is Jayaganesh. I completed my Bachelor of Engineering in Electronics and Communication Engineering at KGiSL Institute of Technology in Coimbatore. My college life in Coimbatore district was one of the happiest phases of my life—I enjoyed learning, spending time with friends, and growing as a person. After completing my degree, I went through a different phase. For almost one year, I didn’t take up a job or focus on building my career. Instead, I spent that time casually, without clear direction. At that moment, it felt comfortable, but slowly I began to realize that time was passing without progress. At the same time, I started feeling pressure from my family regarding my future. That pressure made me think seriously about my life and where I was heading. I understood that I needed to take responsibility and make a strong decision for my career. So, I began exploring opportunities in the IT field. I spoke with experienced people working in IT, and many of them suggested that Full Stack Development has strong future demand and good career growth. After understanding this, I made a clear decision—to learn Full Stack Development and build my skills in the software field. This decision marked a turning point in my life. Instead of wasting time, I chose to invest in myself and work towards a better future. Now, I am focused on learning, improving, and building a career step by step. I know the journey won’t be easy, but this time I am determined to move forward and create a successful path for myself.</p>
            </div>
            <div>
            <h3>Parties</h3>
            <ol>
                <li>Tamilaga Vettri Kazhagam (TVK)</li>
                <li>Dravida Munnetra Kazhagam (DMK)</li>
                <li>All India Anna Dravida Munnetra Kazhagam (AIADMK)</li>
                <li>Bharatiya Janata Party (BJP)</li>
                <li>Indian National Congress (INC)</li>
                <li>Naam Tamilar Katchi (NTK)</li>
                <li>Pattali Makkal Katchi (PMK)</li>
                <li>Viduthalai Chiruthaigal Katchi (VCK)</li>
                <li>Communist Party of India (CPI)</li>
                <li>Communist Party of India (Marxist) – CPI(M)</li>
                <li>Marumalarchi Dravida Munnetra Kazhagam (MDMK)</li>
                <li>Desiya Murpokku Dravida Kazhagam (DMDK)</li>
                <li>Makkal Needhi Maiam (MNM)</li>
                <li>Amma Makkal Munnettra Kazagam (AMMK)</li>
                <li>Indian Union Muslim League (IUML)</li>
                <li>Manithaneya Makkal Katchi (MMK)</li>
                <li>Social Democratic Party of India (SDPI)</li>
                <li>Kongunadu Makkal Desiya Katchi (KMDK)</li>
                <li>Tamilaga Valvurimai Katchi</li>
                <li>Tamilar Desam Katchi</li>
            </ol>
        </div>

      <div>
         <h1>Gym Membership Form</h1>
        <form>
               <label>Enter the Name</label>
               <input type="text"  placeholder="Enter the Name"/> <br /> <br />
               <label>Enter the ID</label>
               <input type="text"  placeholder="Enter the ID"/><br /><br />
               <label>Enter the Mail</label>
               <input type="text"  placeholder="Enter the Mail"/><br /><br />
               <label >Gender</label>
                <input type="radio" required name="Gender" value="Male" />Male
                 <input type="radio" required name="Gender" value="Female" />Female <br /><br />
                 <button>Sumit</button>
        </form>
      </div>
      <div>
         <div>
            <h2>Points Table</h2>

            <table border="1">

                <thead>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Matches</th>
                    <th>Won</th>
                    <th>Lost</th>
                    <th>Points</th>

                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Chennai Super Kings</td>
                        <td>14</td>
                        <td>10</td>
                        <td>4</td>
                        <td>20</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>Mumbai Indians</td>
                        <td>14</td>
                        <td>9</td>
                        <td>5</td>
                        <td>18</td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>Royal Challengers Bengaluru</td>
                        <td>14</td>
                        <td>8</td>
                        <td>6</td>
                        <td>16</td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>Kolkata Knight Riders</td>
                        <td>14</td>
                        <td>8</td>
                        <td>6</td>
                        <td>16</td>
                    </tr>

                    <tr>
                        <td>5</td>
                        <td>Sunrisers Hyderabad</td>
                        <td>14</td>
                        <td>7</td>
                        <td>7</td>
                        <td>14</td>
                    </tr>

                    <tr>
                        <td>6</td>
                        <td>Delhi Capitals</td>
                        <td>14</td>
                        <td>7</td>
                        <td>7</td>
                        <td>14</td>
                    </tr>

                    <tr>
                        <td>7</td>
                        <td>Rajasthan Royals</td>
                        <td>14</td>
                        <td>6</td>
                        <td>8</td>
                        <td>12</td>
                    </tr>

                    <tr>
                        <td>8</td>
                        <td>Punjab Kings</td>
                        <td>14</td>
                        <td>5</td>
                        <td>9</td>
                        <td>10</td>
                    </tr>

                    <tr>
                        <td>9</td>
                        <td>Lucknow Super Giants</td>
                        <td>14</td>
                        <td>5</td>
                        <td>9</td>
                        <td>10</td>
                    </tr>

                    <tr>
                        <td>10</td>
                        <td>Gujarat Titans</td>
                        <td>14</td>
                        <td>4</td>
                        <td>10</td>
                        <td>8</td>
                    </tr>
                </tbody>

            </table>

        </div>
      </div>
        </>
    )
}
export default Header